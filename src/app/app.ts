import { CommonModule } from '@angular/common';
import { Component, signal, OnInit, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import emailjs from 'emailjs-com';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('portafolio');

  // 🔹 Lista de imágenes (rutas dentro de /assets/)
  imagenes: string[] = [
    'fotos-perfil/ChatGPT Image Oct 5, 2025 at 07_42_26 PM.png',
    'fotos-perfil/ChatGPT Image Oct 5, 2025 at 07_45_53 PM.png',
    'fotos-perfil/ChatGPT Image Oct 5, 2025 at 07_49_10 PM.png',
    'fotos-perfil/IMG_0418.jpeg'
  ];

  fondoActual = signal(this.imagenes[0]);
  index = 0;

  saludo: string[] = [
    "HELLO I\'M",
    "HOLA YO SOY",
    "HALLO, ICH BIN",
    "BONJOUR, JE SUIS"
  ];
  fraseActual = signal(this.saludo[0]);

  ngOnInit() {
    setInterval(() => {
      this.index = (this.index + 1) % this.imagenes.length;
      this.fondoActual.set(this.imagenes[this.index]);
      this.fraseActual.set(this.saludo[this.index]);
    }, 1000); // cambia cada 5 segundos  
  }
  linkGithub(){
      window.open('https://github.com/kevinQuinteroB');
  };
  linkLinkedln(){
    window.open('https://www.linkedin.com/in/kevin-quintero-buitrago-0b54b3377/');
  }
  wasap(){
    window.open('https://wa.me/573133124071');
  }
  copyEmail(){
    const email = 'kevinstequintero@gmail.com';
    navigator.clipboard.writeText(email);
  }
  onSubmit(event: Event) {
  event.preventDefault(); // 🔹 Evita que la página se recargue

    emailjs.sendForm('service_kjbpbt4', 'template_necd9kk', event.target as HTMLFormElement, 'dbXVRXOde-Jk_eHS7')
    .then((result) => {
        console.log('Email sent', result.text);
        alert('Message sent!');
    }, (error) => {
        console.error('Error sending email:', error.text);
        alert('Failed to send message.');
    });
  }

  selectedImage: string | null = null;

  openLightbox(src: string) {
    this.selectedImage = src;
    document.body.style.overflow = 'hidden';
  }

  closeLightbox() {
    this.selectedImage = null;
    document.body.style.overflow = '';
  }

  @HostListener('window:keydown.escape') onEsc() {
    if (this.selectedImage) this.closeLightbox();
  }
}