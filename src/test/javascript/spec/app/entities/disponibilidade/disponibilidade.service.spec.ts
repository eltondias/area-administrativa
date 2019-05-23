/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { DisponibilidadeService } from 'app/entities/disponibilidade/disponibilidade.service';
import { IDisponibilidade, Disponibilidade, DiaSemanaEnum, TurnoEnum } from 'app/shared/model/disponibilidade.model';

describe('Service Tests', () => {
  describe('Disponibilidade Service', () => {
    let injector: TestBed;
    let service: DisponibilidadeService;
    let httpMock: HttpTestingController;
    let elemDefault: IDisponibilidade;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(DisponibilidadeService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Disponibilidade(0, currentDate, currentDate, DiaSemanaEnum.SEGUNDA, TurnoEnum.MANHA);
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            horaInicio: currentDate.format(DATE_TIME_FORMAT),
            horaFim: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a Disponibilidade', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            horaInicio: currentDate.format(DATE_TIME_FORMAT),
            horaFim: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            horaInicio: currentDate,
            horaFim: currentDate
          },
          returnedFromService
        );
        service
          .create(new Disponibilidade(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a Disponibilidade', async () => {
        const returnedFromService = Object.assign(
          {
            horaInicio: currentDate.format(DATE_TIME_FORMAT),
            horaFim: currentDate.format(DATE_TIME_FORMAT),
            diaSemana: 'BBBBBB',
            turno: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            horaInicio: currentDate,
            horaFim: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of Disponibilidade', async () => {
        const returnedFromService = Object.assign(
          {
            horaInicio: currentDate.format(DATE_TIME_FORMAT),
            horaFim: currentDate.format(DATE_TIME_FORMAT),
            diaSemana: 'BBBBBB',
            turno: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            horaInicio: currentDate,
            horaFim: currentDate
          },
          returnedFromService
        );
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Disponibilidade', async () => {
        const rxPromise = service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
