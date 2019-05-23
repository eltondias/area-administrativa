/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { VoluntarioService } from 'app/entities/voluntario/voluntario.service';
import { IVoluntario, Voluntario, EstadoVoluntarioEnum } from 'app/shared/model/voluntario.model';

describe('Service Tests', () => {
  describe('Voluntario Service', () => {
    let injector: TestBed;
    let service: VoluntarioService;
    let httpMock: HttpTestingController;
    let elemDefault: IVoluntario;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(VoluntarioService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Voluntario(
        0,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        false,
        currentDate,
        currentDate,
        EstadoVoluntarioEnum.ATIVO
      );
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            dataNascimento: currentDate.format(DATE_TIME_FORMAT),
            dataCadastro: currentDate.format(DATE_TIME_FORMAT)
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

      it('should create a Voluntario', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dataNascimento: currentDate.format(DATE_TIME_FORMAT),
            dataCadastro: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            dataNascimento: currentDate,
            dataCadastro: currentDate
          },
          returnedFromService
        );
        service
          .create(new Voluntario(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a Voluntario', async () => {
        const returnedFromService = Object.assign(
          {
            nome: 'BBBBBB',
            urlFotoPerfil: 'BBBBBB',
            cpf: 'BBBBBB',
            login: 'BBBBBB',
            senha: 'BBBBBB',
            isAdmin: true,
            dataNascimento: currentDate.format(DATE_TIME_FORMAT),
            dataCadastro: currentDate.format(DATE_TIME_FORMAT),
            situacao: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dataNascimento: currentDate,
            dataCadastro: currentDate
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

      it('should return a list of Voluntario', async () => {
        const returnedFromService = Object.assign(
          {
            nome: 'BBBBBB',
            urlFotoPerfil: 'BBBBBB',
            cpf: 'BBBBBB',
            login: 'BBBBBB',
            senha: 'BBBBBB',
            isAdmin: true,
            dataNascimento: currentDate.format(DATE_TIME_FORMAT),
            dataCadastro: currentDate.format(DATE_TIME_FORMAT),
            situacao: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            dataNascimento: currentDate,
            dataCadastro: currentDate
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

      it('should delete a Voluntario', async () => {
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
