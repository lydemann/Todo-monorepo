import { createHttpFactory, HTTPMethod, SpectatorHttp } from '@ngneat/spectator';
import { UserRolesResourceService } from './user-roles-resource.service';

describe('UserRolesResourceService', () => {
  let spectator: SpectatorHttp<UserRolesResourceService>;
  const createHttp = createHttpFactory( UserRolesResourceService);

  beforeEach(() => spectator = createHttp());

  it('should test HttpClient.get', () => {
    spectator.service.get().subscribe();
    spectator.expectOne('/api/resource', HTTPMethod.GET);
  });
});
