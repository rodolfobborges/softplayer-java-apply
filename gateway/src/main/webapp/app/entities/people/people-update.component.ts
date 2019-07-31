import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { IPeople, People } from 'app/shared/model/people.model';
import { PeopleService } from './people.service';

@Component({
  selector: 'jhi-people-update',
  templateUrl: './people-update.component.html'
})
export class PeopleUpdateComponent implements OnInit {
  isSaving: boolean;
  birthDateDp: any;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    sex: [],
    email: [],
    birthDate: [],
    birthPlace: [],
    nationality: [],
    cpf: [null, [Validators.required]]
  });

  constructor(protected peopleService: PeopleService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ people }) => {
      this.updateForm(people);
    });
  }

  updateForm(people: IPeople) {
    this.editForm.patchValue({
      id: people.id,
      name: people.name,
      sex: people.sex,
      email: people.email,
      birthDate: people.birthDate,
      birthPlace: people.birthPlace,
      nationality: people.nationality,
      cpf: people.cpf
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const people = this.createFromForm();
    if (people.id !== undefined) {
      this.subscribeToSaveResponse(this.peopleService.update(people));
    } else {
      this.subscribeToSaveResponse(this.peopleService.create(people));
    }
  }

  private createFromForm(): IPeople {
    return {
      ...new People(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      sex: this.editForm.get(['sex']).value,
      email: this.editForm.get(['email']).value,
      birthDate: this.editForm.get(['birthDate']).value,
      birthPlace: this.editForm.get(['birthPlace']).value,
      nationality: this.editForm.get(['nationality']).value,
      cpf: this.editForm.get(['cpf']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPeople>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
