import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import TextArea from '../../../components/ui/TextArea';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Form from '../../../components/ui/Form';
import Submit from '../../../components/ui/Submit';
import ImageUpload from '../../../components/ui/ImageUpload';
import { postReview } from '../../actions/index';

import StarRating from './StarRating';

import validateEmail from '../../../utils/validateEmail';

const StyledRadioButton = styled.label`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const StyledRadioButtons = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding-bottom: 2%;
`;

const StyledTextArea = styled(TextArea)`
  margin-bottom: 0px;
`;

export default function WriteNewReview({ productId, handleCloseModal }) {
  const demo = true;
  const [ratingDemo, setRatingDemo] = useState(false);

  const [ratings, setRatings] = useState({});
  const [recommend, setRecommend] = useState(undefined);
  const [summary, setSummary] = useState('');
  const [body, setBody] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photos, setPhotos] = useState([]);

  const characteristics = useSelector((state) => (state.ratingsReviews.meta.characteristics));
  const characteristicsTraits = Object.keys(characteristics);

  const dispatch = useDispatch();

  const handleSubmit = (e, error) => {
    if (!error) {
      const submitChar = {};
      characteristicsTraits.forEach((char) => {
        const charObj = characteristics[char];
        submitChar[charObj.id] = ratings[char];
      });

      const data = {
        product_id: productId,
        rating: ratings.Overall,
        summary,
        body,
        recommend,
        name,
        email,
        photos,
        characteristics: submitChar,
      };

      console.log(data);

      dispatch(postReview(productId, data))
        .then(() => {
          handleCloseModal();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleYesClick = () => {
    setRecommend(true);
  };

  const handleNoClick = () => {
    setRecommend(false);
  };

  const imageDeleteHandler = (e, i) => {
    const temp = [...photos];
    temp.splice(i, 1);
    setPhotos(temp);
  };

  const imageChangeHandler = (e) => {
    const { files } = e.target;
    const temp = [...photos];
    for (let i = 0; i < files.length; i += 1) {
      temp.push(URL.createObjectURL(files[i]));
    }
    setPhotos(temp);
  };

  const charRatings = ['Overall', ...characteristicsTraits].map((char) => (
    <StarRating
      ratings={ratings}
      setRatings={setRatings}
      char={char}
      demo={ratingDemo}
    />
  ));

  const meetMinChar = (min, value) => value.length > min;

  const handleDemo = () => {
    setRecommend(true);
    setSummary('nulla porttitor massa id neque aliquam');
    setBody('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac turpis egestas maecenas pharetra. Ultricies mi quis hendrerit dolor. Fermentum leo vel orci porta non pulvinar. Aliquam sem et tortor consequat id porta nibh. Mauris in aliquam sem fringilla. Etiam sit amet nisl purus in mollis nunc sed. Velit sed ullamcorper morbi tincidunt ornare massa eget. Neque viverra justo nec ultrices dui. Cras ornare arcu dui vivamus. Eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis. Aenean pharetra magna ac placerat vestibulum. Non diam phasellus vestibulum lorem sed. Facilisis volutpat est velit egestas dui id ornare arcu odio. Egestas maecenas pharetra convallis posuere. ');
    setName('Aenean');
    setEmail('Aenean@gmail.com');
    setRatingDemo(true);
    ['Overall', ...characteristicsTraits].forEach((char) => {
      ratings[char] = 4;
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        required
        size="60"
        value={name}
        onChange={(e) => setName(e.target.value)}
        label="What is your nickname"
        validation={(value) => value.length <= 60}
        placeholder="Example: jackson11!"
        warning="For privacy reasons, do not use your full name or email address"
        error="Username must have fewer than 60 characters."
        id="Nickname"
      />

      <Input
        required
        size="60"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        label="Your email"
        validation={(value) => value.length <= 60 && validateEmail(value)}
        placeholder="Example: jack@email.com!"
        warning="For authentication reasons, you will not be emailed"
        error="Email must be a valid email."
        id="Email"
      />

      <StyledRadioButtons required id="Recommend">
        Do you recommend this product?
        <StyledRadioButton htmlFor="Yes">
          <input type="radio" id="Yes" checked={recommend === true} onClick={handleYesClick} />
          Yes
        </StyledRadioButton>
        <StyledRadioButton htmlFor="No">
          <input type="radio" id="No" checked={recommend === false} onClick={handleNoClick} />
          No
        </StyledRadioButton>
      </StyledRadioButtons>

      <div>
        Ratings
        {charRatings}
      </div>

      <TextArea
        required
        cols="100"
        rows="5"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        label="Summary"
        validation={(value) => value.length <= 60}
        error="You wrote too many characters in your Summary! The limit is 60."
        id="Summary"
      />

      <StyledTextArea
        required
        cols="100"
        rows="5"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        label="Body"
        validation={(value) => value.length <= 1000 && value.length >= 50}
        error={() => {
          if (body.length <= 50) {
            return 'You did not meet the minimum of 50 chracters.';
          }
          return 'You wrote too many characters in your Summary! The limit is 1000.';
        }}
        warning={
          meetMinChar(50, body)
            ? 'Minimum reached'
            : ` Minimum required characters left: ${50 - body.length}`
        }
        id="Body"
      />

      <ImageUpload
        data-testid="image-field"
        label="Upload your photos"
        images={photos}
        onDelete={imageDeleteHandler}
        onChange={imageChangeHandler}
        error="You may only submit up to five images!"
        validation={(imgs) => imgs.length <= 5}
      />
      {demo ? <Button variant="small" onClick={handleDemo}> Demo </Button> : ''}
      <Submit>Submit question</Submit>
    </Form>
  );
}

WriteNewReview.propTypes = {
  productId: PropTypes.number.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
};
