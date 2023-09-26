import React, { useState, useEffect } from 'react';
import style from '../styles/page.module.css';
import axios from 'axios';

interface Character {
    id: number;
    name: string;
    status: string;
    gender: string;
}

const Pagination: React.FC = () => {
    let pageNumber = 1;
    if (pageNumber > 42) {
        pageNumber = 42;
    } else if (pageNumber < 1) {
        pageNumber = 1;
    }
    const [page, setPage] = useState<number>(pageNumber);
    const [dataList, setDataList] = useState<Character[]>([]);
    console.log(dataList);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://rickandmortyapi.com/api/character/?page=${page}`,
                );
                setDataList(response.data.results);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [page]);

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

                    {dataList.map((character) => (
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
                            <div className={style.table_td}>image</div>
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
