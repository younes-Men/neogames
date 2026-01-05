const supabase = require('../config/supabaseClient');

const addGame = async () => {
    const newGame = {
        title: 'NBA 2K25',
        price: 270,
        image: '/nba_2k25.png',
        platform: 'PC',
        rating: 4.8,
        description: 'Pursue your NBA dreams in NBA 2K25, where you can lead your own dynasty or experience the rise of a new star.'
    };

    try {
        const { data, error } = await supabase
            .from('games')
            .insert([newGame])
            .select();

        if (error) {
            console.error('Error adding game:', error);
        } else {
            console.log('Game added successfully:', data);
        }
    } catch (err) {
        console.error('Unexpected error:', err);
    }
};

addGame();
