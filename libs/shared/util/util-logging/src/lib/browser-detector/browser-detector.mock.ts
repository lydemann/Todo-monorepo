import { IBrowserDetectorService } from './browser-detector.service';

export class BrowserDetectorServiceMock implements IBrowserDetectorService {
	public isIE11() {
		return null;
	}
	public isSafari() {
		return null;
	}
}
