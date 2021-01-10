import { createHttpFactory, HTTPMethod, SpectatorHttp } from '@ngneat/spectator';
import { <%= classify(name) %>ResourceService } from './<%= name %>-resource.service';

describe('<%= classify(name) %>ResourceService', () => {
  let spectator: SpectatorHttp<<%= classify(name) %>ResourceService>;
  const createHttp = createHttpFactory( <%= classify(name) %>ResourceService);

  beforeEach(() => spectator = createHttp());

  it('should test HttpClient.get', () => {
    spectator.service.get().subscribe();
    spectator.expectOne('<%= url %>', HTTPMethod.GET);
  });
});
