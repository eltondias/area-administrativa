/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { CampanhaService } from 'app/entities/campanha/campanha.service';
import { ICampanha, Campanha } from 'app/shared/model/campanha.model';

describe('Service Tests', () => {
  describe('Campanha Service', () => {
    let injector: TestBed;
    let service: CampanhaService;
    let httpMock: HttpTestingController;
    let elemDefault: ICampanha;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(CampanhaService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Campanha(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', currentDate, currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            dataHoraInicio: currentDate.format(DATE_TIME_FORMAT),
            dataHoraFim: currentDate.format(DATE_TIME_FORMAT)
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

      it('should create a Campanha', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dataHoraInicio: currentDate.format(DATE_TIME_FORMAT),
            dataHoraFim: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            dataHoraInicio: currentDate,
            dataHoraFim: currentDate
          },
          returnedFromService
        );
        service
          .create(new Campanha(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a Campanha', async () => {
        const returnedFromService = Object.assign(
          {
            nome: 'BBBBBB',
            descricao: 'BBBBBB',
            slogan: 'BBBBBB',
            dataHoraInicio: currentDate.format(DATE_TIME_FORMAT),
            dataHoraFim: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dataHoraInicio: currentDate,
            dataHoraFim: currentDate
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

      it('should return a list of Campanha', async () => {
        const returnedFromService = Object.assign(
          {
            nome: 'BBBBBB',
            descricao: 'BBBBBB',
            slogan: 'BBBBBB',
            dataHoraInicio: currentDate.format(DATE_TIME_FORMAT),
            dataHoraFim: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            dataHoraInicio: currentDate,
            dataHoraFim: currentDate
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

      it('should delete a Campanha', async () => {
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
