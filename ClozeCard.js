//Constructor (full-text, cloze)
//    this.full-text
//    this.cloze
//    this.partial = makePartial(){

//    }
//makePartial{
//    return partial
//}

function ClozeCard(full, cloze) {
    this.full = full;
    this.cloze = cloze;
    this.partial = makePartial(full, cloze);
}

function makePartial(full, cloze) {
    if (full.includes(cloze)) {
        return full.replace(cloze, "....");
    } else {
        console.log("Please check again");
    }
}

module.exports = ClozeCard;
