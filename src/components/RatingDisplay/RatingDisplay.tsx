import React, {useState} from 'react';
import { ReactComponent as GoldStar } from '@src/assets/icons/goldStar.svg';
import { ReactComponent as HalfGoldStar } from '@src/assets/icons/goldHalfStar.svg';

interface RatingDisplayProps {
    academicRating: number;
}

export const RatingDisplay: React.FC<RatingDisplayProps> = ({ academicRating }) => {
    const generateStars = () => {
        const fullStars = Math.floor(academicRating);
        const hasHalfStar = academicRating - fullStars >= 0.5;
    
        const stars: React.ReactNode[] = [];
    
        for (let i = 0; i < fullStars; i++) {
          stars.push(<GoldStar key={i} />);
        }
    
        if (hasHalfStar) {
          stars.push(<HalfGoldStar key="half" />);
        }
    
        return stars;
    };
    
    return <>{generateStars()}</>;
};