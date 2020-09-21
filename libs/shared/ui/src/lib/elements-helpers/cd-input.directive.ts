import {
	ApplicationRef,
	ChangeDetectorRef,
	Directive,
	HostListener,
	OnChanges,
	SimpleChanges,
} from '@angular/core';

@Directive({ selector: '[appCDTrigger]' })
export class CDInputDirective implements OnChanges {
	constructor(
		private changeDetectionRef: ChangeDetectorRef,
		private applicationRef: ApplicationRef,
	) {}

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
