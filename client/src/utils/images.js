const PATH = "https://api.dicebear.com/10.x/voxel-bot/svg?backgroundColor=&seed=";

export const getProfileImage = (username) => {
  return `${PATH}${username}`;
}
