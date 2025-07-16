import {useHandleRecipe} from '../hooks/useHandleRecipe.js'

export const Recipe = () => {
  const { setIngredients, recipe, errors, loading, setRecipe, setErrors, handleRecipe, ingredients } =
    useHandleRecipe();

  const showRecipe = (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8 bg-light-dark p-5 rounded">
          <h3 className="text-light text-center">Your recipe</h3>
          <pre
            className="bg-white p-4 rounded"
            style={{ whiteSpace: "pre-wrap" }}
          >
            {recipe}
          </pre>
          <div className="text-center mt-4">
            <button
              className="btn btn-secondary"
              onClick={() => {
                setRecipe(null);
                setIngredients("");
                setErrors({});
              }}
            >
              New ingredients
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const setIngredient = (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 bg-light-dark p-5 rounded">
          <h3 className="text-light text-center">My ingredients</h3>
          <form onSubmit={handleRecipe}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="enter ingredients"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                disabled={loading}
              />
              {errors.ingredients && (
                <small className="text-danger">{errors.ingredients}</small>
              )}
            </div>
            {errors.non_field_errors && (
              <div className="alert alert-danger">
                {errors.non_field_errors.map((err, i) => (
                  <div key={i}>{err}</div>
                ))}
              </div>
            )}
            <div className="text-center">
              <button type="submit" className="btn btn-info" disabled={loading}>
                {loading ? "Generating..." : "Make a recipe"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  return <>{recipe ? showRecipe : setIngredient}</>;
};