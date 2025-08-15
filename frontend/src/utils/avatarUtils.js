export const generateDiceBearAvatar = (seed, gender = null) => {
    let url = `https://api.dicebear.com/8.x/adventurer/svg?seed=${seed}`;
    if (gender) {
        url += `&gender=${gender}`;
    }
    return url;
};

export const generateRandomAvatars = (count = 8) => {
    const avatars = [];
    const genders = ['male', 'female'];
    for (let i = 0; i < count; i++) {
        const seed = Math.random().toString(36).substring(7);
        const gender = genders[Math.floor(Math.random() * genders.length)];
        avatars.push(generateDiceBearAvatar(seed, gender));
    }
    return avatars;
};
