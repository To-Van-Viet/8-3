function removeVietnameseTones(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim();
}

function containsAllWords(input, keywords) {
  return keywords.every((word) => input.includes(word));
}

function checkName() {
  let name = document.getElementById("nameInput").value;
  let normalizedName = removeVietnameseTones(name);

  const left = document.querySelector(".left-curtain");
  const right = document.querySelector(".right-curtain");

  // Đóng thiệp
  left.classList.add("active");
  right.classList.add("active");

  setTimeout(() => {
    if (containsAllWords(normalizedName, ["pham", "thi", "huyen", "trang"])) {
      window.location.href = "cauchuc1.html";
    } else if (containsAllWords(normalizedName, ["co", "be", "bat", "ca"])) {
      window.location.href = "cauchuc2.html";
    } else {
      window.location.href = "cauchuc3.html";
    }
  }, 1000);
}
