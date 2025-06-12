import {
	ApplicationRef,
	ChangeDetectorRef,
	Directive,
	HostListener,
	OnChanges,
	SimpleChanges,
} from '@angular/core';

@Directive({
	selector: '[appCDTrigger]',
	standalone: false,
})
export class CDInputDirective implements OnChanges {
	constructor(
		private changeDetectionRef: ChangeDetectorRef,
		private applicationRef: ApplicationRef,
	) {}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public ngOnChanges(changes: SimpleChanges): void {
		this.runCD();
	}

	@HostListener('click', ['$event'])
	@HostListener('change', ['$event'])
	private runCD() {
		this.applicationRef.tick();
		this.changeDetectionRef.detectChanges();
	}
}
