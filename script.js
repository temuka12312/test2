let dictionary;

// Load the dictionary
async function loadDictionary() {
  const affData = await fetch('mn_aff.aff').then(res => res.text());
  const dicData = await fetch('mn_dic.dic').then(res => res.text());
  dictionary = new Typo("mn", affData, dicData);
}

// Check spelling
function checkSpelling() {
  const input = document.getElementById("textInput").value;
  const words = input.split(/\s+/); // Split by whitespace
  const results = document.getElementById("results");
  results.innerHTML = ""; // Clear previous results

  words.forEach(word => {
    if (!dictionary.check(word)) {
      const suggestion = dictionary.suggest(word);
      results.innerHTML += `<p class="error">Алдаа: ${word} 
        <br> Санал болгож буй: ${suggestion.join(", ") || "Үгүй"}</p>`;
    }
  });

  if (results.innerHTML === "") {
    results.innerHTML = "<p>Алдаа олдсонгүй!</p>";
  }
}

// Attach event listener to button
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("checkButton").addEventListener("click", checkSpelling);
  loadDictionary();
});
