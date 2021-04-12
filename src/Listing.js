import firebase from 'firebase'

export class Listing {
  constructor(listingJSON) {
    this.title = listingJSON.title;
    this.postedDate = listingJSON.postedDate;
    this.listingId = listingJSON.listingId;
    this.postedBy = listingJSON.postedBy;
    this.address = new Address(listingJSON.address);
    this.descriptionLine1 = listingJSON.descriptionLine1;
    this.descriptionLine2 = listingJSON.descriptionLine2;
    this.postedByExistingFDMer = listingJSON.postedByExistingFDMer;
    this.location = new Location(listingJSON.location);
    this.pictures = listingJSON.pictures;
    this.videos = listingJSON.videos;
    this.petFriendly = listingJSON.petFriendly;
    this.price = listingJSON.price;
    this.paymentFrequency = listingJSON.paymentFrequency
    this.availability = listingJSON.availability;
    this.reservedStatus = listingJSON.reservedStatus;
    this.approvedListing = listingJSON.approvedListing;
    this.latitude=listingJSON.latitude
    this.longitude=listingJSON.longitude
  }
}

export class Location {
  constructor(locationJSON) {
    this.town = locationJSON.town;
    this.region = locationJSON.region;
    this.country = locationJSON.country;
  }
}

export class Address {
  constructor(addressJSON) {
    this.line1 = addressJSON.line1;
    this.line2 = addressJSON.line2;
    this.line2 = addressJSON.line3;
    this.town = addressJSON.town;
    this.region = addressJSON.region;
    this.postcode = addressJSON.postcode;
    this.country = addressJSON.country;
  }
}
