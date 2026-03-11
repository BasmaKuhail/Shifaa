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