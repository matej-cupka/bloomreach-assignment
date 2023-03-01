import {Subject} from 'rxjs';

export class DestroySubject extends Subject<void> {
  override next() {
    super.next();
    this.complete();
  }
}
