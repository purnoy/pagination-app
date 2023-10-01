import React, { useState } from 'react';
import style from '../styles/page.module.css';
import { useQuery } from '@apollo/client';
import { GET_CHARACTERS } from './../provider/queries';
import { FcBusinessman, FcBusinesswoman } from 'react-icons/fc';

interface Character {
    id: number;
    name: string;
    status: string;
    gender: string;
}

const Pagination = () => {
    const [page, setPage] = useState(1);

    const { loading, error, data } = useQuery(GET_CHARACTERS, {
        variables: { page },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const characters = data.characters.results;

    const nextPage = () => {
        setPage((prevPage) => Math.min(prevPage + 1, 42));
    };

    const prevPage = () => {
        setPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    return (
        <div>
            <div className={style.table_div}>
                <div className={style.output_table}>
                    <div className={style.table_tr}>
                        <div className={style.table_th}>ID</div>
                        <div className={style.table_th}>Name</div>
                        <div className={style.table_th}>Status</div>
                        <div className={style.table_th}>Gender</div>
                        <div className={style.table_th}>Gender Image</div>
                    </div>

                    {characters.map((character: Character) => (
                        <div key={character.id} className={style.table_tr}>
                            <div className={style.table_td}>{character.id}</div>
                            <div className={style.table_td}>
                                {character.name.slice(0, 10)}
                            </div>
                            <div className={style.table_td}>
                                {character.status}
                            </div>
                            <div className={style.table_td}>
                                {character.gender}
                            </div>
                            <div className={style.table_td}>
                                {character.gender === 'Male' ? (
                                    <FcBusinessman size={30} />
                                ) : character.gender === 'Female' ? (
                                    <FcBusinesswoman size={30} />
                                ) : (
                                    'Unknown Image'
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={style.btnClass}>
                <button
                    type="submit"
                    onClick={prevPage}
                    disabled={page === 1}
                    className={`${page === 1 ? style.inactive : ''} ${
                        style.buttonClass
                    }`}
                >
                    Prev
                </button>
                <button
                    type="submit"
                    onClick={nextPage}
                    disabled={page === 42}
                    className={`${page === 42 ? style.inactive : ''} ${
                        style.buttonClass
                    }`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Pagination;
