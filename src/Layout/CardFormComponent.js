import React from "react";

export default function CardFormComponent({submitCardFormHandler, handleCardInputChange, cardFormData, cancelCardHandler}){

    return (
        <form onSubmit={submitCardFormHandler} className="ml-5 mr-5">
        <div className="form-group mt-2">
          <label htmlFor="front">Front</label>
          <textarea
            className="form-control"
            id="front"
            name="front"
            rows="3"
            placeholder="Front side of card"
            onChange={handleCardInputChange}
            value={cardFormData.front}
          />
        </div>
        <div className="form-group">
          <label htmlFor="back">Back</label>
          <textarea
            className="form-control"
            id="back"
            name="back"
            rows="3"
            placeholder="Back side of card"
            onChange={handleCardInputChange}
            value={cardFormData.back}
          ></textarea>
        </div>
        <button
          type="cancel"
          className="btn btn-secondary mb-2 mr-2"
          onClick={cancelCardHandler}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary mb-2">
          Submit
        </button>
      </form>
    )
}