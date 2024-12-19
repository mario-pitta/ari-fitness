import { Injectable } from "@angular/core";
import confetti from "canvas-confetti";
@Injectable({
  providedIn: 'root'
})
export class ConfettiService {

  constructor() { }

  showConfetti() {

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

  }

  clearConfetti() {
    confetti.reset();
  }
}
