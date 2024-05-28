const token = "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";

const searchForm = document.querySelector("[searchForm]");
const searchBar = document.querySelector("[searchBar]");
const searchButton = document.querySelector("[searchButton]");
const resetButton = document.querySelector("button[type=reset]");

const errorMessage = document.querySelector("[errorMessage]");

const profileImage = document.querySelector("[profileImage]");
const userName = document.querySelector("[userName]");
const joiningDate = document.querySelector("[joiningDate]");
const profileLink = document.querySelector("[profileLink]");
const bio = document.querySelector("[bio]");

const repoNum = document.querySelector("[repoNum]");
const followerNum = document.querySelector("[followerNum]");
const followingNum = document.querySelector("[followingNum]");
const address = document.querySelector("[address]");
const blogLink = document.querySelector("[blogLink]");
const twitter = document.querySelector("[twitter]");
const institute = document.querySelector("[institute]");

// as soon as page we fetch our github detailes and render it
fetchUserInfo("atharv-av");

searchForm.addEventListener("submit", (e) => {
	e.preventDefault();
	if (searchBar != "") fetchUserInfo(searchBar.value);
});

async function fetchUserInfo(user) {
	try {
		const response = await fetch(`https://api.github.com/users/${user}`, {
			headers: {
				Authorization: `token ${token}`,
			},
		});

		if (!response.ok) {
			throw new Error("");
		}
		const data = await response.json();

		renderUserInfo(data);
	} catch (e) {
		searchBar.value = "No Search Results";
		searchBar.classList.remove("text-[#4b6a9b]");
		searchBar.classList.add("text-red-900", "font-extrabold");
		setTimeout(function () {
			searchBar.value = "";
			searchBar.classList.add("text-[#4b6a9b]");
			searchBar.classList.remove("text-red-900", "font-extrabold");
		}, 2000);
	}
}

function renderUserInfo(data) {
	profileImage.src = data?.avatar_url;
	userName.innerText = data?.name;

	const date = `Joined ${data?.created_at}`;
	newdate = date.split("T")[0];
	joiningDate.innerText = newdate;

	profileLink.innerText = `@${data?.login}`;
	profileLink.href = data?.html_url;
	bio.innerText = data?.bio ? data?.bio : "This profile has no bio";
	repoNum.innerHTML = data?.public_repos;
	followerNum.innerHTML = data?.followers;
	followingNum.innerHTML = data?.following;

	address.innerText = data?.location ? data?.location : "Not Available";

	if (data?.blog) {
		blogLink.href = data?.blog;
		blogLink.innerText = data?.blog;
	} else {
		blogLink.innerText = "Not Available";
	}

	if (data?.twitter_username) {
		twitter.href = data?.twitter_username;
		twitter.innerText = data?.twitter_username;
	} else {
		twitter.innerText = "Not Available";
	}

	institute.innerText = data?.company ? data?.company : "Not Available";
}

// To change mode

const modeButton = document.querySelector("[modeButton]");
const wrapper = document.querySelector("[wrapper]");
const numberList = document.querySelector("[numberList]");
const profile = document.querySelector("[profile]");
let heading = document.querySelector("[heading]");

// intial Condition
let nextMode = "dark";
modeButton.innerHTML = `${nextMode} <i class="fa-solid fa-sun text-[24px]"></i>`;
modeButton.classList.add("text-[#4b6a9b]");

modeButton.addEventListener("click", () => {
	changeButtonUI();
	changeMode();
});

function changeButtonUI() {
	if (nextMode == "dark") {
		nextMode = "light";
		modeButton.innerHTML = `${nextMode} <i class="fa-solid fa-moon text-[24px]"></i>`;
		modeButton.classList.remove("text-[#4b6a9b]");
		modeButton.classList.add("text-[#ffffff]");
	} else {
		nextMode = "dark";
		modeButton.innerHTML = `${nextMode} <i class="fa-solid fa-sun text-[24px]"></i>`;
		modeButton.classList.add("text-[#4b6a9b]");
		modeButton.classList.remove("text-[#ffffff]");
	}
}

function changeMode() {
	if (nextMode == "light") {
		wrapper.classList.remove("bg-[#f6f8ff]");
		wrapper.classList.add("bg-[#141d2f]");

		numberList.classList.remove("bg-[#f6f8ff]");
		numberList.classList.add("bg-[#141d2f]");

		profile.classList.remove("bg-white", "text-[#4b6a9b]");
		profile.classList.add("bg-[#1e2a47]", "text-white");

		searchForm.classList.remove("bg-white");
		searchForm.classList.add("bg-[#1e2a47]");

		heading.classList.add("text-[#ffffff]");

		searchBar.classList.remove(
			"placeholder:text-[#4b6a9b]",
			"text-[#4b6a9b]"
		);
		searchBar.classList.add("placeholder:text-white", "text-white");

		userName.classList.remove("text-[#2b3442]");
		userName.classList.add("text-white");

		repoNum.classList.remove("text-[#2b3442]");
		followerNum.classList.remove("text-[#2b3442]");
		followingNum.classList.remove("text-[#2b3442]");

		repoNum.classList.add("text-white");
		followerNum.classList.add("text-white");
		followingNum.classList.add("text-white");
	} else {
		wrapper.classList.add("bg-[#f6f8ff]");
		wrapper.classList.remove("bg-[#141d2f]");

		numberList.classList.add("bg-[#f6f8ff]");
		numberList.classList.remove("bg-[#141d2f]");

		profile.classList.add("bg-white", "text-[#4b6a9b]");
		profile.classList.remove("bg-[#1e2a47]", "text-white");

		searchForm.classList.add("bg-white");
		searchForm.classList.remove("bg-[#1e2a47]");

		heading.classList.remove("text-[#ffffff]");

		searchBar.classList.add("placeholder:text-[#4b6a9b]", "text-[#4b6a9b]");
		searchBar.classList.remove("placeholder:text-white", "text-white");

		userName.classList.add("text-[#2b3442]");
		userName.classList.remove("text-white");

		repoNum.classList.add("text-[#2b3442]");
		followerNum.classList.add("text-[#2b3442]");
		followingNum.classList.add("text-[#2b3442]");

		repoNum.classList.remove("text-white");
		followerNum.classList.remove("text-white");
		followingNum.classList.remove("text-white");
	}
}

// to display reset button

searchBar.addEventListener("mouseup", () => {
	resetButton.classList.remove("hidden");
});