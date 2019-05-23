import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'estado',
        loadChildren: './estado/estado.module#AreaadmistrativaEstadoModule'
      },
      {
        path: 'cidade',
        loadChildren: './cidade/cidade.module#AreaadmistrativaCidadeModule'
      },
      {
        path: 'endereco',
        loadChildren: './endereco/endereco.module#AreaadmistrativaEnderecoModule'
      },
      {
        path: 'voluntario',
        loadChildren: './voluntario/voluntario.module#AreaadmistrativaVoluntarioModule'
      },
      {
        path: 'telefone',
        loadChildren: './telefone/telefone.module#AreaadmistrativaTelefoneModule'
      },
      {
        path: 'email',
        loadChildren: './email/email.module#AreaadmistrativaEmailModule'
      },
      {
        path: 'rede-social',
        loadChildren: './rede-social/rede-social.module#AreaadmistrativaRedeSocialModule'
      },
      {
        path: 'habilidade',
        loadChildren: './habilidade/habilidade.module#AreaadmistrativaHabilidadeModule'
      },
      {
        path: 'profissao',
        loadChildren: './profissao/profissao.module#AreaadmistrativaProfissaoModule'
      },
      {
        path: 'disponibilidade',
        loadChildren: './disponibilidade/disponibilidade.module#AreaadmistrativaDisponibilidadeModule'
      },
      {
        path: 'campanha',
        loadChildren: './campanha/campanha.module#AreaadmistrativaCampanhaModule'
      },
      {
        path: 'recurso-necessario',
        loadChildren: './recurso-necessario/recurso-necessario.module#AreaadmistrativaRecursoNecessarioModule'
      },
      {
        path: 'doacao',
        loadChildren: './doacao/doacao.module#AreaadmistrativaDoacaoModule'
      },
      {
        path: 'forma-pagamento',
        loadChildren: './forma-pagamento/forma-pagamento.module#AreaadmistrativaFormaPagamentoModule'
      },
      {
        path: 'acao',
        loadChildren: './acao/acao.module#AreaadmistrativaAcaoModule'
      },
      {
        path: 'participacao',
        loadChildren: './participacao/participacao.module#AreaadmistrativaParticipacaoModule'
      },
      {
        path: 'profissao-necessaria-acao',
        loadChildren: './profissao-necessaria-acao/profissao-necessaria-acao.module#AreaadmistrativaProfissaoNecessariaAcaoModule'
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AreaadmistrativaEntityModule {}
