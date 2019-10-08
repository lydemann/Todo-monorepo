import { Injectable } from '@angular/core';

import { BrowserNames } from './browser-names.enum';

export interface IBrowserDetectorService {
	isIE11(): boolean;
	isSafari(): boolean;
}

@Injectable({
	providedIn: 'root',
})
export class BrowserDetectorService implements IBrowserDetectorService {
	public isIE11() {
		return this.getVendorAndVersion() === 'IE 11';
	}

	public isSafari() {
		return (
			this.getVendorAndVersion()
				.toLocaleLowerCase()
				.indexOf('Safari'.toLocaleLowerCase()) >= 0
		);
	}

	/**
	 * Snippet inspiration taken from:
	 * https://stackoverflow.com/questions/5916900/how-can-you-detect-the-version-of-a-browser
	 */
	public getVendorAndVersion() {
		const navigatorRef = window.navigator;
		const ua = navigatorRef.userAgent;
		const agentStrings = this.getAgentStrings(navigatorRef.userAgent);
		let temp: string[];

		if (this.isIEAgent(agentStrings[1])) {
			return this.getIEString(ua);
		}

		if (this.isChromeAgent(agentStrings[1])) {
			temp = ua.match(/\b(OPR|Edge)\/(\d+)/);
			// Seems like Opera is a "sub-class" of the Chrome agent.
			if (temp !== null) {
				return temp
					.slice(1)
					.join(' ')
					.replace(BrowserNames.OperaShort, BrowserNames.Opera);
			}
		}

		temp = navigatorRef.userAgent.match(/version\/(\d+)/i);
		const match = agentStrings[2]
			? [agentStrings[1], agentStrings[2]]
			: [navigatorRef.appName, navigatorRef.appVersion, '-?'];
		if (temp != null) {
			match.splice(1, 1, temp[1]);
		}

		return match.join(' ');
	}

	private getIEString(userAgent: string) {
		const temp = /\brv[ :]+(\d+)/g.exec(userAgent) || [];
		return `${BrowserNames.IE} ${temp[1] || ''}`;
	}

	private isIEAgent(userAgent: string) {
		return /trident/i.test(userAgent);
	}

	private isChromeAgent(userAgent: string) {
		return userAgent === BrowserNames.Chrome;
	}

	private getAgentStrings(userAgent: string) {
		return (
			userAgent.match(
				/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i,
			) || []
		);
	}
}
