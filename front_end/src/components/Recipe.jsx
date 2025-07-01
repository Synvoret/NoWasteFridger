import React, { useState } from 'react'
import axios from 'axios'

const Recipe = () => {
  const [ingredients, setIngredients] = useState('')
  const [recipe, setRecipe] = useState(null)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleRecipe = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data } = await axios.post(
        'http://127.0.0.1:8000/api/v1/generate-recipe/',
        { ingredients }
      )
      setErrors({})
      setRecipe(data.recipe)
    } catch (error) {
      setErrors(error.response?.data || { non_field_errors: ['Błąd serwera'] })
    } finally {
      setLoading(false)
    }
  }

  if (recipe) {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 bg-light-dark p-5 rounded">
            <h3 className="text-light text-center">Twój przepis</h3>
            <pre className="bg-white p-4 rounded" style={{ whiteSpace: 'pre-wrap' }}>
              {recipe}
            </pre>
            <div className="text-center mt-4">
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setRecipe(null)
                  setIngredients('')
                  setErrors({})
                }}
              >
                Wprowadź nowe składniki
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 bg-light-dark p-5 rounded">
          <h3 className="text-light text-center">Moje składniki</h3>
          <form onSubmit={handleRecipe}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Wpisz składniki"
                value={ingredients}
                onChange={e => setIngredients(e.target.value)}
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
              <button
                type="submit"
                className="btn btn-info"
                disabled={loading}
              >
                {loading ? 'Generowanie…' : 'Zrób przepis'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Recipe
