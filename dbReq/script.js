async function printAllCards() {
    try {
        fetch("http://localhost:8181/cards")
            .then((res) => res.json)
            .then((cards) => console.log(cards))
            .catch((err) => console.log(err));
    } catch (error) {
        console.log(error);
    }
}

printAllCards();