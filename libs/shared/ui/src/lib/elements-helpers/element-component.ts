import {
	ApplicationRef,
	ChangeDetectorRef,
	Component,
	HostListener,
} from '@angular/core';

@Component({
	template: '',
})
export abstract class ElementComponent {
	constructor(
		private changeDetectionRef: ChangeDetectorRef,
		private applicationRef: ApplicationRef,
	) {}
	@HostListener('click', ['$event'])
	@HostListener('change', ['$event'])
	public runCD() {
		this.applicationRef.tick();
		this.changeDetectionRef.detectChanges();
	}
}
