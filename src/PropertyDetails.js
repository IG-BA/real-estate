import React from 'react';

function PropertyDetails({ property }) {
    return (
        <div className="alert alert-secondary">
            <h5>Деталі об'єкта</h5>
            <p><strong>ID:</strong> {property.id}</p>
            <p><strong>Заголовок:</strong> {property.title}</p>
            <p><strong>Опис:</strong> {property.body}</p>
        </div>
    );
}

export default PropertyDetails;
