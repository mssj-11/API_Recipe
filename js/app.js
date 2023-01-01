//Initial References
let Result = Document.getElementById("Result");
let SearchBtn = Document.getElementById("Search-Btn");
let Url = "Https://Www.Themealdb.Com/Api/Json/V1/1/Search.Php?S=";

SearchBtn.AddEventListener("Click", () => {
    let UserInp = Document.getElementById("User-Inp").Value;
  If (UserInp.Length == 0) {
    Result.InnerHTML = `<H3>Input Field Cannot Be Empty</H3>`;
  } else {
    fetch(Url + UserInp)
      .then((Response) => Response.Json())
      .then((Data) => {
        let MyMeal = Data.Meals[0];
        Console.Log(MyMeal);
        Console.Log(MyMeal.StrMealThumb);
        Console.Log(MyMeal.StrMeal);
        Console.Log(MyMeal.StrArea);
        Console.Log(MyMeal.StrInstructions);
        let Count = 1;
        let Ingredients = [];
        For (let I In MyMeal) {
            let Ingredient = "";
            let Measure = "";
          If (I.StartsWith("StrIngredient") && MyMeal[I]) {
            Ingredient = MyMeal[I];
            Measure = MyMeal[`StrMeasure` + Count];
            Count += 1;
            Ingredients.Push(`${Measure} ${Ingredient}`);
          }
        }
        Console.Log(Ingredients);

        Result.InnerHTML = `
    <Img Src=${MyMeal.StrMealThumb}>
    <Div Class="Details">
        <H2>${MyMeal.StrMeal}</H2>
        <H4>${MyMeal.StrArea}</H4>
    </Div>
    <Div Id="Ingredient-Con"></Div>
    <Div Id="Recipe">
        <Button Id="Hide-Recipe">X</Button>
        <Pre Id="Instructions">${MyMeal.StrInstructions}</Pre>
    </Div>
    <Button Id="Show-Recipe">View Recipe</Button>
    `;
    let IngredientCon = Document.getElementById("Ingredient-Con");
    let Parent = Document.CreateElement("Ul");
    let Recipe = Document.getElementById("Recipe");
    let HideRecipe = Document.getElementById("Hide-Recipe");
    let ShowRecipe = Document.getElementById("Show-Recipe");

        Ingredients.ForEach((I) => {
        let Child = Document.CreateElement("Li");
          Child.InnerText = I;
          Parent.AppendChild(Child);
          IngredientCon.AppendChild(Parent);
        });

        HideRecipe.AddEventListener("Click", () => {
          Recipe.Style.Display = "None";
        });
        ShowRecipe.AddEventListener("Click", () => {
          Recipe.Style.Display = "Block";
        });
      })
      .Catch(() => {
        Result.InnerHTML = `<H3>Invalid Input</H3>`;
      });
  }
});














