import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
type AOA = any[][];

@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit{
    emailForm= {
        docSepin:'',
        empresaSepin:'',
        nomeRh:'',
        projeto:'',
        anoBase:'',
        emailRh:'',
    }
    textFormat: any;
    line: any;
    emailFormat: string;
    data: any;
    textFormatArray = new Array();
    emailFormatArray = new Array;
    clicked: boolean;

    ngOnInit(){
    }

    onFileChange(evt: any) {
        /* wire up file reader */
        const target: DataTransfer = <DataTransfer>(evt.target);
        if (target.files.length !== 1) throw new Error('Cannot use multiple files');
        const reader: FileReader = new FileReader();
        reader.onload = (e: any) => {
          /* read workbook */
          const bstr: string = e.target.result;
          const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});
    
          /* grab first sheet */
          const wsname: string = wb.SheetNames[0];
          const ws: XLSX.WorkSheet = wb.Sheets[wsname];
    
          /* save data */
          this.data = <AOA>(XLSX.utils.sheet_to_json(ws, {header: 1}));
          console.log(this.data)
        };
        reader.readAsBinaryString(target.files[0]);
      }

    onSubmit(form){
        for (let x in this.data) {
            this.textFormatArray.push
            (
                this.textFormat = 'Prezado(a) ' + this.data[x][0] + '%0D%0A' +'%0D%0A' +
                                'Entro em contato, referente ao projeto SEPIN, no que se refere à documentação dos projetos realizados pela Ericsson do Brasil e Parceiros,' + '%0D%0A' +'%0D%0A' +
                                'Verificamos que seu nome foi relacionado para o projeto ' + this.emailForm.projeto +', do ano base' + this.emailForm.anoBase + ',' + '%0D%0A' + 
                                'Desta forma, venho por meio deste e-mail solicitar a gentileza do seu apoio para nos informar quais atividades você efetuou e de quais features/setores você participou neste ano base informado,' + '%0D%0A' +
                                'Certo da sua compreensão e grato desde já,' + '%0D%0A'+'%0D%0A' +
                                'Atenciosamente,' +'%0D%0A' +
                                this.emailForm.docSepin + '%0D%0A' +
                                this.emailForm.empresaSepin
            ) 
            console.log(this.textFormat)
            this.emailFormatArray.push
            (
                this.emailFormat = 'mailto:'+ this.data[x][1] + '?subject=Documentação SEPIN - Projeto '+ this.emailForm.projeto + ' Ano Base - '+this.emailForm.anoBase+'&body='+ this.textFormat
            )
            console.log(this.emailFormat)
        }
    }
    onClick()
    {
        this.clicked = true;
    }
}
