import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  access_token_secret: 'lamsonkma',
  access_token_exp: 3 * 60,
  refresh_token_secret: 'lamson2000',
  refresh_token_exp: 15 * 60,
}));
