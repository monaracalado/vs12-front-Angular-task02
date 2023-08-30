import { HttpClient } from '@angular/common/http';
import { Component, Input, ChangeDetectorRef } from '@angular/core';

interface IAppointmentData {
  name: string;
  date: string;
  time: string;
  veterinario: string;
  type: string;
}

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss'],
})
export class AgendaComponent {
  appointments: { name: string, date: string, time: string, veterinario: string, type: string }[] = [];
  appointmentData: IAppointmentData = { name: '', date: '', time: '', veterinario: '', type: '' };
  tiposAtendimento: string[] = ['Consulta', 'Tosa', 'Banho', 'Exame', 'Vacinação', 'Cirurgia', 'Outro'];
  isUpdating: boolean = false;
  appointmentIndexToUpdate: number = -1;

  @Input() name = '';

  veterinarios: any[] = [];

  constructor(http: HttpClient, private changeDetectorRef: ChangeDetectorRef) {
    http
      .get<any[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe((data) => {
        this.veterinarios = data;
        console.log(this.veterinarios);
      });
      
    this.appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
  }

  scheduleAppointment() {
 
    const selectedDate = new Date(this.appointmentData.date + 'T' + this.appointmentData.time);
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      alert('Não é possível agendar uma data no passado.');
      return;
    }
 
    if (!this.appointmentData.name || !this.appointmentData.date || !this.appointmentData.time || !this.appointmentData.veterinario || !this.appointmentData.type) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    if (this.isUpdating) {
      this.appointments[this.appointmentIndexToUpdate] = { ...this.appointmentData };
      this.isUpdating = false;
      this.appointmentIndexToUpdate = -1;
    } else {
      this.appointments.push(this.appointmentData);
    }

    localStorage.setItem('appointments', JSON.stringify(this.appointments));
    alert('Agendamento realizado!')
    this.clearForm();

    this.changeDetectorRef.markForCheck();
  }

  cancelAppointment(appointmentIndex: number) {
    this.appointments.splice(appointmentIndex, 1);
    localStorage.setItem('appointments', JSON.stringify(this.appointments));
    this.changeDetectorRef.markForCheck();
  }

  updateAppointment(appointmentIndex: number) {
    this.isUpdating = true;
    this.appointmentIndexToUpdate = appointmentIndex;
    const appointmentToUpdate = this.appointments[appointmentIndex];
    this.appointmentData = { ...appointmentToUpdate };
    this.changeDetectorRef.markForCheck();
  }

  clearForm() {
    this.appointmentData = { name: '', date: '', time: '', veterinario: '', type: ''  };
  }

  displayedColumns: string[] = ['name', 'date', 'time', 'veterinario', 'type', 'actions'];
}
