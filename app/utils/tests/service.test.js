import { getJXCList } from '../service';

it('测试众筹进销存接口', () => {
    expect.assertions(1);
    const param = {
        page: 1,
        page_size: 5,
    }
    return getJXCList(param).then(data => {
        console.log(data)
        expect(data.code).toBe(1);
    });
});