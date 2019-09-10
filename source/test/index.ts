import { expect } from 'chai';
import { describe, it, before } from 'mocha';
import getImageSizes from '../vamtiger-image-size';

const imagePaths = [
    'https://upload.wikimedia.org/wikipedia/commons/b/b5/Infers_group_-_arting_health_-_street_art_-_graffiti_-_metal_health_-_depression_-_520x400_-_funded_by_then_welcome_trust.jpg'
];

describe('vamtiger-image-size should return', function () {
    it('image sizes', async function () {
        const imageSizes = await getImageSizes({imagePaths}) || [];
        const [imageSize] = imageSizes;

        expect(imageSizes).to.be.ok;
        expect(imageSize).to.be.ok;
        expect(imageSize && Number(imageSize.width)).to.equal(520);
        expect(imageSize && Number(imageSize.height)).to.equal(400);
    })
});