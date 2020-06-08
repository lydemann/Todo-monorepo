import { ApplicationRef, ChangeDetectorRef, HostListener } from '@angular/core';

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
