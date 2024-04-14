import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getHeros, addHeros, updateHeros, deleteHeros } from '../../api/herosApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faSave } from '@fortawesome/free-solid-svg-icons';

const Herolist = () => {
  const [newheros, setHeros] = React.useState('');
  const [editingHeroId, setEditingHeroId] = React.useState(null);
  const [editedName, setEditedName] = React.useState('');
  const queryClient = useQueryClient();

  const { isLoading, isError, error, data: heros } = useQuery('heros', getHeros);

  const addHeroMutation = useMutation(addHeros, {
    onSuccess: () => {
      queryClient.invalidateQueries('heros');
    },
  });

  const updateHeroMutation = useMutation(updateHeros, {
    onSuccess: () => {
      queryClient.invalidateQueries('heros');
      setEditingHeroId(null); 
    },
  });

  const deleteHeroMutation = useMutation(deleteHeros, {
    onSuccess: () => {
      queryClient.invalidateQueries('heros');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const maxId = Math.max(...heros.map(hero => hero.id), 0); // Find maximum ID
    const newHeroId = String(maxId + 1); // Increment the maximum ID by 1 and convert it to a string
    addHeroMutation.mutate({
      id: newHeroId,
      name: newheros    });
    setHeros('');
  };

  const handleUpdate = (hero) => {
    console.log("Hero before update:", hero);
    console.log("Edited name before update:", editedName);
    
    updateHeroMutation.mutate({ ...hero, name: editedName }, {
      onSuccess: () => {
        console.log("Update successful!");
        setEditingHeroId(null);
      },
      onError: (error) => {
        console.error("Update error:", error);
      }
    });
  };
  

  
  
  

  const handleDelete = (id) => {
    deleteHeroMutation.mutate({ id: id });
  };

  const handleEdit = (hero) => {
    setEditingHeroId(hero.id);
    setEditedName(hero.name);
  };

  const newItenSection = (
    <form onSubmit={handleSubmit}>
      <label htmlFor="new-heros">Enter your note </label>
      <div >
        <input
          type="text"
          id="heros"
          value={newheros}
          onChange={(e) => setHeros(e.target.value)}
          placeholder="Enter your note here"
        />
      </div>
      <button id="submit">
        Submit
      </button>
    </form>
  );

  const renderHeroItem = (hero) => {
    if (editingHeroId === hero.id) {
      return (
        <li key={hero.id}>
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            
                />
            <button onClick={() => handleUpdate({ ...hero, name: editedName })}>
    <FontAwesomeIcon icon={faSave} />
    </button>

        </li>
      );
    } else {
      return (
        <li key={hero.id}>
          <span>{hero.name}</span>
          <button onClick={() => handleEdit(hero)}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button onClick={() => handleDelete(hero.id)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </li>
      );
    }
  };

  let content;
  if (isLoading) {
    content = <p>Loading....</p>;
  } else if (isError) {
    content = <p>{error.message}</p>;
  } else {
    content = <ul>{heros.map(renderHeroItem)}</ul>;
  }

  return (
    <main>
      <h1>Note</h1>
      {newItenSection}
      {content}
    </main>
  );
};

export default Herolist;
