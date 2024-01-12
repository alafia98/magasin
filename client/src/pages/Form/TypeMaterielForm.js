import React from 'react'

const TypeMaterielForm = ({handleSubmit, value, setValue}) => {
  return (
    <>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <input type="text" className="form-control" placeholder='Entrez le nom de type' 
                value={value} onChange={(e) => setValue(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-success">Ajouter</button>
        </form>
    </>
  )
}

export default TypeMaterielForm