/*
 * Created by Stefan Korecko, 2020-21
 * Opinions form processing functionality
 */

/*
This function works with the form:

<form id="opnFrm">
    <label for="nameElm">Your name:</label>
    <input type="text" name="login" id="nameElm" size="20" maxlength="50" placeholder="Enter your name here" required />
    <br><br>
    <label for="opnElm">Your opinion:</label>
    <textarea name="comment" id="opnElm" cols="50" rows="3" placeholder="Express your opinion here" required></textarea>
    <br><br>
    <input type="checkbox" id="willReturnElm" />
    <label for="willReturnElm">I will definitely return to this page.</label>
    <br><br>
    <button type="submit">Send</button>
</form>

 */

export default function processOpnFrmData(event){
    //1.prevent normal event (form sending) processing
    event.preventDefault();

    //2. Read and adjust data from the form (here we remove white spaces before and after the strings)
    const name = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();

    let faction = document.getElementById("form1").elements["faction"].value.trim();
    if (faction === "" || faction == null) {
        faction = "fig/horde-opinion.svg"
        var element = document.getElementsByName("opinion-photo");
    } else if (faction === "Horde") {
        faction = "fig/HordeSymbol.png"
    } else if (faction === "Alliance") {
        faction = "fig/AllianceSymbolBackground.png"
    }

    let url = document.getElementById("url").value.trim();
    if (url === "" || url == null) {
        url = "https://i.pinimg.com/474x/65/25/a0/6525a08f1df98a2e3a545fe2ace4be47.jpg"
    }

    const playedBefore = document.querySelectorAll('input[name=like]:checked');
    let checkedItems = []
    playedBefore.forEach(elm => {
        checkedItems.push(elm.getAttribute('data-value'))
    })


    const favorite = document.getElementById("datadisk").value.trim();
    const comment = document.getElementById("textarea").value.trim();

    //3. Verify the data
    if (name == "" || comment == "") {
        window.alert("Please, enter both your name and opinion");
        return;
    }

    //3. Add the data to the array opinions and local storage
    const newOpinion =
        {
            name: name,
            email: email,
            url: url,
            favorite: favorite,
            faction: faction,
            datadisk: checkedItems,
            comment: comment,
            created: new Date()
        };

    console.log("New opinion:\n " + JSON.stringify(newOpinion));

    let opinions = [];

    if(localStorage.myTreesComments){
        opinions=JSON.parse(localStorage.myTreesComments);
    }
    opinions.push(newOpinion);

    localStorage.myTreesComments = JSON.stringify(opinions);

    window.location.hash="#opinions";
}



