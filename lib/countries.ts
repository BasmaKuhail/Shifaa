// export const fetchCountries = async () => {
//     const response = await fetch(
//   'https://api.restcountries.com/countries/v5?q=canada',
//   { headers: { 'Authorization': 'Bearer rc_live_fb2eb182498845b89743b210ec81855a' } }
// )
//   .then(function (response) { return response.json(); })
//   .then(function (data) { console.log(data); });

//   console.log(response)

//     return response; 
// };
export const fetchCountries = async () => {
    const res = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,cca2,idd,flags"
    );
    const data = await res.json();

    return data.map((c: any) => ({
        name: c.name.common,
        iso: c.cca2,
        dialCode: c.idd?.root
        ? c.idd.root + (c.idd.suffixes?.[0] || "")
        : "",
        flag: c.flags.png,
    }));
};