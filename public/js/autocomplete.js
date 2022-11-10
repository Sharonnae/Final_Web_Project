var GoogleMapsDemo = GoogleMapsDemo || {};

GoogleMapsDemo.Utilities = (function () {
    var _getUserLocation = function (successCallback, failureCallback) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                successCallback(position);
            }, function () {
                failureCallback(true);
            });
         } else {
             failureCallback(false);
         }
    };
    
    return {
        GetUserLocation: _getUserLocation
    }
})();

GoogleMapsDemo.Application = (function () {
    var _init = function () {
        GoogleMapsDemo.Utilities.GetUserLocation(function (browserHasGeolocation) {
            _initAutocompletes();
        });
    };
    
    var _initAutocompletes = function () {
        $('.places-autocomplete').each(function () {
            var input = this;
            var autocomplete = new google.maps.places.Autocomplete(input, {
                types: 'address'
            });
            
            autocomplete.addListener('place_changed', function () {
                _placeChanged(autocomplete);
            });
            
            $(input).on('keydown', function (e) {
                // Prevent form submit when selecting from autocomplete dropdown with enter key.
                if (e.keyCode === 13 && $('.pac-container:visible').length > 0) {
                    e.preventDefault();
                }
            });
        });
    }
    
    var _placeChanged = function (autocomplete) {
        var place = autocomplete.getPlace();
        console.log('dfd', place)
        _updateAddress({
            address_components: place.formatted_address,
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
        });
    }
    
    var _updateAddress = function (args) {
        $('#format_address').val(args.address_components)
        $('#user_lat').val(args.lat)
        $('#user_lng').val(args.lng)
    }
    
    return {
        Init: _init
    }
})();

/* This should ideally be a callback for the async version of the Google Maps script reference.
   However, Codepen doesn't give enough control over the document to ensure that the Google
   Maps script tag is placed after the JS code here. */
GoogleMapsDemo.Application.Init();