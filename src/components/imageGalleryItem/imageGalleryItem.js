import { Image, Card } from "./imageGalleryItem.styled";
import PropTypes from "prop-types";

export const ImageItem = ({ images, selectImage }) => {
  return images.map(({ webformatURL, tags, largeImageURL }, idx) => (
    <Card
      onClick={() => {
        selectImage(largeImageURL);
      }}
      key={idx}
    >
      <Image src={webformatURL} alt={tags} />
    </Card>
  ));
};

ImageItem.propTypes = {
  images: PropTypes.array.isRequired,
  selectImage: PropTypes.func.isRequired,
};
