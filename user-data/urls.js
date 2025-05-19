const githubUsername = "sid-senthilkumar";

const gitRepos = (username) => `https://api.github.com/users/${username}/repos?sort=updated&per_page=4`;

export const URLs = {
    gitRepo: gitRepos(githubUsername),
};
