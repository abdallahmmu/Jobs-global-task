import { Component, inject, OnInit, signal, TemplateRef, ViewChild, WritableSignal } from '@angular/core';
import { DataContextService } from '../../../shared/services/data-context.service';
import { JobsDTO, ResultObjectDTO } from '../../../shared/dtos/jobs-dto';
import { UiHelperService } from '../../../shared/services/ui-helper.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
interface filterParams {
  keyword:string;
  page:number;
  location:string;
  per_page:number;
  pagination_type:string
}

import { countries } from '../../../shared/dummyData/dummyData';


@Component({
  selector: 'app-jobs-list',
  standalone: false,
  templateUrl: './jobs-list.component.html',
  styleUrl: './jobs-list.component.css',
})
export class JobsListComponent implements OnInit {
  isJobsLoading: WritableSignal<boolean> = signal(false);
  jobsList: WritableSignal<JobsDTO[]> = signal([]);
  filterParams: WritableSignal<filterParams> = signal({
    keyword: '',
    page: 1,
    location: '',
    per_page: 11,
    pagination_type: 'paginate',
  });
  private modalService = inject(NgbModal);
  applyForm!: FormGroup;
  countriesList: any;
  @ViewChild('jobsDetails') jobsDetails!: TemplateRef<any>;
  constructor(
    private dataContext: DataContextService,
    private uiHelper: UiHelperService
  ) {}

  ngOnInit(): void {
    this.gettingJobs();
    this.initApplyForm();
  }

  private initApplyForm() {
    this.applyForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      country_code_id: new FormControl('0', Validators.required),
      education: new FormControl('', Validators.required),
      current_position: new FormControl('', Validators.required),
      company: new FormControl('', Validators.required),
      cover_letter: new FormControl(''),
      uploaded_link: new FormControl('', Validators.required),
    });
  }

  private gettingJobs() {
    this.isJobsLoading.update((prevValue) => !prevValue);
    const sub = this.dataContext.GetData(`/all`, this.filterParams()).subscribe(
      (data) => {
        const response = <ResultObjectDTO<JobsDTO>>data;
        this.jobsList.update((prevData) => prevData.concat(response.data));
        this.isJobsLoading.update((prevValue) => !prevValue);
        sub.unsubscribe()

      },
      (err) => {
        this.uiHelper.toastrError('Something went woring when fetching data');
        this.isJobsLoading.update((prevValue) => !prevValue);
        sub.unsubscribe()
      }
    );
  }

  loadMoreJobs() {
    this.filterParams.update((prevState) => {
      return {
        ...prevState,
        page: prevState.page + 1,
      };
    });
    this.gettingJobs();
  }

  tempJobDetails!: JobsDTO | null;
  openDetailsJob(job: JobsDTO) {
    this.tempJobDetails = { ...job }; // broke the refrance between the old object and the new to parse the meta data every time;
    this.tempJobDetails.work_space_meta_data = JSON.parse(
      this.tempJobDetails.work_space_meta_data
    ); // parsing work_space_meta_data

    //getting savedJobs to see if the job has been saved before

    const savedJobs: any = this.uiHelper.getParam('savedJobs') || [];
    const appliedJobs: any = this.uiHelper.getParam('appliedJobs') || [];
    if (
      savedJobs &&
      savedJobs.some((job: any) => job.id === this.tempJobDetails?.id)
    ) {
      this.tempJobDetails.saved = true;
    } else {
      this.tempJobDetails.saved = false;
    }

    if (
      appliedJobs &&
      appliedJobs.some((job: any) => job.id === this.tempJobDetails?.id)
    ) {
      this.tempJobDetails.applied = true;
    } else {
      this.tempJobDetails.applied = false;
    }

    this.modalService.open(this.jobsDetails, {
      backdrop: 'static',
      centered: true,
      size: 'md',
    });

    this.gettingCountries();
  }

  private gettingCountries() {
    this.countriesList = countries;
  }

  onBackToDetails() {
    this.detailsState = 'details';
    this.uiHelper.updatFormValues(this.applyForm);
  }

  onCloseJobModal() {
    this.tempJobDetails = null;
    this.detailsState = 'details';
    this.modalService.dismissAll();
    this.uiHelper.updatFormValues(this.applyForm);
  }

  onSaveJob() {
    let savedJobs: any = this.uiHelper.getParam('savedJobs') || [];
    if (this.tempJobDetails && savedJobs.some((job: any) => job.id)) {
      savedJobs = savedJobs.filter(
        (job: any) => job.id !== this.tempJobDetails?.id
      );
    } else {
      if (this.tempJobDetails) {
        savedJobs.push({
          id: this.tempJobDetails.id,
        });
      }
    }
    this.uiHelper.setParam('savedJobs', savedJobs);
    this.tempJobDetails = null;
    this.modalService.dismissAll();
    this.uiHelper.updatFormValues(this.applyForm);
  }

  detailsState: string = 'details';
  onApplyJob() {
    this.detailsState = 'apply';
  }

  handeSendApply() {
    if (this.applyForm.invalid) {
      this.uiHelper.toastrError('Invalid Data', 'Error');
      this.applyForm.markAllAsTouched();
      return;
    }
    let appliedJobs: any = this.uiHelper.getParam('appliedJobs') || [];
    appliedJobs.push({
      id: this.tempJobDetails?.id,
    });
    this.uiHelper.setParam('appliedJobs', appliedJobs);
    this.onCloseJobModal();
  }

  onUploadFile(e: Event) {
    let file = (e.target as HTMLInputElement).files?.[0]!;
    if (file === undefined) return;
    const allowedExtensions = ['pdf', 'docx', 'png', 'jpeg', 'jpg'];
    const fileExtension = file.name.split('.')[1];

    if (!allowedExtensions.includes(fileExtension)) {
      this.uiHelper.toastrError(
        'Invalid file format. Please select a .png, .jpeg, .docx, .pdf, or .jpg file.',
        'Oh Snap!'
      );
      return;
    }

    if (file && file?.size > 3145728) {
      // more that 3MB
      this.uiHelper.toastrError(
        'file size is too big, max size is 3MB',
        'Upload Error!'
      );
      return;
    }
    const formDataFile = new FormData();
    formDataFile.append('file', file);

    this.applyForm.get('uploaded_link')?.setValue(file.name);
    this.uiHelper.toastrSuccess('file uploaded Successfully', 'Uploaded');
  }


  timerId: any;
  handelSearchKeywords(e: Event) {
    //debounce the request
    if (this.timerId) {
      clearTimeout(this.timerId);
    }

    this.timerId = setTimeout(() => {
      this.filterParams.update((prevFilter) => {
        return {
          ...prevFilter,
          keyword: (e.target as HTMLInputElement).value,
        };
      });

      this.searchFetching();
    }, 800);
  }

  private searchFetching() {
    this.isJobsLoading.update((prevValue) => !prevValue);
    const sub =this.dataContext.GetData(`/all`, this.filterParams()).subscribe(
      (data) => {
        const response = <ResultObjectDTO<JobsDTO>>data;
        this.jobsList.set(response.data);
        this.isJobsLoading.update((prevValue) => !prevValue);
        sub.unsubscribe()

      },
      (err) => {
        this.uiHelper.toastrError('Something went woring when fetching data');
        this.isJobsLoading.update((prevValue) => !prevValue);
        sub.unsubscribe()
      }
    );
  }

  onSearch() {
    this.isJobsLoading.update((prevValue) => !prevValue);
    const sub = this.dataContext.GetData(`/all`, this.filterParams()).subscribe({
      next: (data) => {
        const response = <ResultObjectDTO<JobsDTO>>data;
        this.jobsList.set(response.data);
        this.isJobsLoading.update((prevValue) => !prevValue);
        sub.unsubscribe()

      },
      error: (err) => {
        this.uiHelper.toastrError('Something went woring when fetching data');
        this.isJobsLoading.update((prevValue) => !prevValue);
        sub.unsubscribe()

      },
    });
  }

  clearSearch(){
    this.filterParams.set({
      keyword:'',
      location:'',
      page:1,
      pagination_type:'paginate',
      per_page:11
    })
  }
}
