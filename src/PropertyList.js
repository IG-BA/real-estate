import React, { useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';

const baseProperties = [
    { id: 1, title: 'Сучасна квартира в центрі', description: '2 кімнати, 65 м², метро поруч', details: 'Квартира з євроремонтом, балкон, 10 поверх.', type: 'Квартира' },
    { id: 2, title: 'Будинок у передмісті', description: '150 м², 1 поверх, сад', details: 'Приватизована земля, гараж, газове опалення.', type: 'Будинок' },
    { id: 3, title: 'Офісне приміщення', description: '80 м², бізнес-центр', details: 'Ідеально для IT-компанії, охорона, паркінг.', type: 'Нежитлова' },
    { id: 4, title: 'Гарсоньєра на Позняках', description: '1 кімната, 35 м²', details: 'Поруч ТРЦ, школи, метро, 7 поверх.', type: 'Квартира' },
    { id: 5, title: 'Дача біля річки', description: '60 м² + ділянка', details: 'Чудове місце для відпочинку, сад, альтанка.', type: 'Будинок' },
    { id: 6, title: 'Торгівельне приміщення', description: '45 м², прохідне місце', details: 'Ідеально для магазину або кавʼярні.', type: 'Нежитлова' },
    { id: 7, title: 'Пентхаус із терасою', description: '120 м², тераса 30 м²', details: 'Чудовий вигляд на місто, елітний комплекс.', type: 'Квартира' },
    { id: 8, title: 'Гараж на Оболоні', description: '20 м²', details: 'Металеві ворота, сухе приміщення, охорона.', type: 'Нежитлова' },
];

const properties = baseProperties.map(p => ({
    ...p,
    image: `images/img${p.id}.jpg`
}));

const PropertyList = () => {
    const [selected, setSelected] = useState(null);
    const [filterType, setFilterType] = useState('');

    // Фільтрація за вибраним типом
    const filtered = filterType
        ? properties.filter(p => p.type === filterType)
        : properties;

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Пропозиції нерухомості</h2>

            {/* Вбудована форма вибору типу */}
            <form className="mb-4">
                <h5>Фільтр за типом нерухомості:</h5>
                {['Квартира', 'Будинок', 'Нежитлова'].map(type => (
                    <div className="form-check" key={type}>
                        <input
                            className="form-check-input"
                            type="radio"
                            name="propertyType"
                            value={type}
                            id={`filter-${type}`}
                            checked={filterType === type}
                            onChange={e => setFilterType(e.target.value)}
                        />
                        <label className="form-check-label" htmlFor={`filter-${type}`}>
                            {type}
                        </label>
                    </div>
                ))}
                <button
                    type="button"
                    className="btn btn-secondary btn-sm mt-2"
                    onClick={() => setFilterType('')}
                >
                    Скинути фільтр
                </button>
            </form>

            <div className="row">
                {filtered.map((prop) => (
                    <div className="col-md-6 mb-4" key={prop.id}>
                        <Card>
                            <div className="d-flex">
                                <Card.Body>
                                    <Card.Title>{prop.title}</Card.Title>
                                    <Card.Text>{prop.description}</Card.Text>
                                    <Button variant="primary" onClick={() => setSelected(prop)}>
                                        Детальніше
                                    </Button>
                                </Card.Body>
                                <Card.Img
                                    variant="top"
                                    src={prop.image}
                                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                    alt={prop.title}
                                />
                            </div>
                        </Card>
                    </div>
                ))}
            </div>

            {selected && (
                <Modal show={true} onHide={() => setSelected(null)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{selected.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <img src={selected.image} alt={selected.title} className="img-fluid mb-3" />
                        <p>{selected.details}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setSelected(null)}>
                            Закрити
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};

export default PropertyList;
