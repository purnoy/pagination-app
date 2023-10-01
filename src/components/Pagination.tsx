import React, { useEffect, useState } from 'react';
import style from '../styles/page.module.css';
import { FcBusinessman, FcBusinesswoman } from 'react-icons/fc';
import axios from 'axios';
import qs from 'qs';

interface Character {
    id: number;
    name: string;
    status: string;
    gender: string;
}

const Pagination = () => {
    const [page, setPage] = useState(1);
    console.log(page);
    const [dataList, setDataList] = useState([]);
    console.log(dataList);
    const [newCharacter, setNewCharacter] = useState<Character>({
        id: 0,
        name: '',
        status: '',
        gender: '',
    });

    const requestConfigtoGetData = {
        url: `https://rickandmortyapi.com/api/character/?page=${page}`,
        method: 'get',
        baseURL: 'https://rickandmortyapi.com/api',
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
        params: {
            ID: 12345,
        },
        paramsSerializer: function (params: any) {
            return qs.stringify(params, { arrayFormat: 'brackets' });
        },
        timeout: 1000,
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios(requestConfigtoGetData);
                setDataList(response.data.results);
            } catch (error) {
                console.error('Error while fetching data: ', error);
            }
        };
        fetchData();
    }, [page]);

    const requestConfigToCreateData = {
        url: 'https://rickandmortyapi.com/api/character/',
        data: newCharacter,
    };
    const createCharacter = async () => {
        // try {
        //     const response = await axios.post(requestConfigToCreateData);
        //     setDataList((prevDatas: any) => [...prevDatas, response.data]);
        // } catch (error) {
        //     console.error('Error While creating character', error);
        // }
    };

    const nextPage = () => {
        setPage((prevPage) => Math.min(prevPage + 1, 42));
    };

    const prevPage = () => {
        setPage((prevPage) => Math.max(prevPage - 1, 1));
    };
    const deleteItem = async (id: number | string) => {
        try {
            // await axios.delete(
            //     `https://rickandmortyapi.com/api/character/${id}`,
            // );
            const newDataList = dataList.filter((item) => item.id !== id);
            setDataList(newDataList);
        } catch (error) {
            console.log('Error while deleting characters', error);
        }
    };

    return (
        <div>
            <div className={style.table_div}>
                <div className={style.table_input}>
                    <input type="text" placeholder="ID" onChange={(e) => {}} />
                    <input
                        type="text"
                        placeholder="Name"
                        onChange={(e: any) => {
                            setNewCharacter(e.target.value);
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Status"
                        onChange={(e: any) => {
                            setNewCharacter(e.target.value);
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Gender"
                        onChange={(e: any) => {
                            setNewCharacter(e.target.value);
                        }}
                    />
                    <button onClick={createCharacter}>Create Character</button>
                    <button onClick={() => {}}>Update Character</button>
                </div>

                <div className={style.output_table}>
                    <div className={style.table_tr}>
                        <div className={style.table_th}>ID</div>
                        <div className={style.table_th}>Name</div>
                        <div className={style.table_th}>Status</div>
                        <div className={style.table_th}>Gender</div>
                        <div className={style.table_th}>Gender Image</div>
                    </div>

                    {dataList.map((character: Character) => (
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
                                <button
                                    onClick={() => deleteItem(character.id)}
                                >
                                    delete
                                </button>
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
