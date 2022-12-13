import { generateAvailableUsername } from '@wasp/core/auth.js';

// custom function to create a unique username with provided google details
// e.g. Firstname.Lastname.1234
export async function getUserFields(_context, args) {
  const username = await generateAvailableUsername(args.profile.displayName.split(' '), { separator: '.' });
  return { username };
}
