"use client";
import Header from "./Header/index"
import Footer from "./Footer/index";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useLayoutEffect, useState, memo } from "react";
import { v4 as uuidv4 } from "uuid";
import classNames from "classnames";
import Image from "next/image";
import manual1Image from "/public/images/manual1.png";
import manual2Image from "/public/images/manual2.png";
import pwa1Image from "/public/images/pwa1.png";
import pwa2Image from "/public/images/pwa2.png";
import pwa3Image from "/public/images/pwa3.png";
import { OneSignalInitial } from './lib/OneSignalInitial';
//import Checkbox from '@mui/material/Checkbox'

const MemoizedHeader = memo(Header);
const MemoizedFooter = memo(Footer);

export type MyFormTextData = {
  id: string; // UUIDを追加
  item: string;
  summary: string;
  category: string;
  date: Date;
};

export default function Home() {
  const [formData, setFormData] = useState<MyFormTextData[]>([]);
  // React Hook Formの使用
  const {
    register: registerText,
    handleSubmit: handleSubmitText,
    formState: { errors: textErrors },
    reset,
  } = useForm<MyFormTextData>();
  const [selectedOption, setSelectedOption] = useState("");
  const [showPwaSection, setShowPwaSection] = useState(false);

  //const title = "断捨離App Next.js page";

  const onSubmitText: SubmitHandler<MyFormTextData> = (data) => {
    if (formData.length <= 25 - 1) {
      const newData = { ...data, date: new Date(), id: uuidv4() }; // UUIDを生成して割り当てる // ボタンを押した時間を記録
      let additionalMinutes = 0;
      switch (newData.category) {
        case "1day":
          additionalMinutes = 1 * 60 * 24;
          break;
        case "3day":
          additionalMinutes = 3 * 60 * 24;
          break;
        case "ファッション": // Category A
          additionalMinutes = 7 * 60 * 24;
          break;
        case "ホビー": // Category B
          additionalMinutes = 14 * 60 * 24;
          break;
        case "日用品": // Category C
          additionalMinutes = 5 * 60 * 24;
          break;
        case "コスメ": // Category D
          additionalMinutes = 3 * 60 * 24;
          break;
        case "食品": // Category E
          additionalMinutes = 7 * 60 * 24;
          break;
        case "家具": // Category F
          additionalMinutes = 20 * 60 * 24;
          break;
        case "家電": // Category G
          additionalMinutes = 14 * 60 * 24;
          break;
        case "約束":
          additionalMinutes = 60;
          break;
        case "思い出": // Category H
          additionalMinutes = 2;
          break;
        case "恋人": // Category I
          additionalMinutes = 1;
          break;
        case "悩み事": // Category I
          additionalMinutes = 1;
          break;
        default:
          additionalMinutes = 7 * 60 * 24;
          break;
      }
      const futureDate = new Date(
        newData.date.getTime() + additionalMinutes * 60 * 1000,
      ); // 追加する時間を計算（分単位）
      newData.date = futureDate; // 新しい時間を設定
      setFormData((prevFormData) => [...prevFormData, newData]);
      reset();
    } else {
      // フォームが制限を超えている場合の処理を追加する
      alert("You can only submit up to 25 entries.");
    }
  };

  const clearLocalStorage = () => {
    localStorage.removeItem('alldata');
    setFormData([]);
  };

  const handleDelete = (idToDelete: string) => {
    const updatedFormData = formData.filter((data) => data.id !== idToDelete); // 識別子に基づいて削除
    setFormData(() => updatedFormData);
  };

  //モバイル端末用の対策(window.addEventListener("beforeunload", handleWindowClose);が効かないモバイル用)
  const handleSave = () => {
    const keys = Object.keys(formData);
    if (keys.length > 0) {
      localStorage.setItem("alldata", JSON.stringify(formData));
    }
  };

  const handleExtend = (idToExtend: string, additionalMinutes: number) => {
    const updatedFormData = formData.map((data) => {
      if (data.id === idToExtend) {
        const currentDate = new Date(data.date); // 文字列型から Date オブジェクトに変換
        const extendedDate = new Date(
          currentDate.getTime() + additionalMinutes * 60 * 1000,
        ); // 現在の時間に1日を追加
        return { ...data, date: extendedDate };
      }
      return data;
    });
    setFormData(() => updatedFormData);
  };

  const handleAction = (action: string, dataId: string) => {
    switch (action) {
      case "delete":
        handleDelete(dataId);
        break;
      case "extendH":
        handleExtend(dataId, 60);
        break;
      case "extendD":
        handleExtend(dataId, 60 * 24);
        break;
      default:
        // デフォルトの処理
        break;
    }
    // 選択肢をリセットする
    setSelectedOption("");
  };

  //---最初に1回だけlocalstrageをチェックしてstateに複製する
  useLayoutEffect(() => {
    const fetchDataFromLocalStorage = () => {
      console.log("fetchDataFromLocalStorage()");
      const dataFromLocalStorage = localStorage.getItem("alldata");

      //もしローカルストレージに無関係なデータが入っている場合はfilterで取り除く
      if (dataFromLocalStorage) {
        const parsedData: any[] = JSON.parse(dataFromLocalStorage);
        const validData: MyFormTextData[] = parsedData.filter((item: any) => (
          item.id &&
          item.item &&
          item.category
        ));
        setFormData(validData);
      }
    };
    fetchDataFromLocalStorage();
  }, []); // 空の配列を渡すことで、このeffectは最初のマウント時のみ実行される

  //---最後に1回だけlocalstrageに保存する(途中データはstateに保存)
  useEffect(() => {
    const handleWindowClose = () => {
      // ウィンドウまたはタブが閉じられたときの処理 --------------最後にlocalstrageに保存する(途中データはstateに保存)
      console.log("handleWindowClose()");
      const keys = Object.keys(formData);
      if (keys.length > 0) {
        localStorage.setItem("alldata", JSON.stringify(formData));
      }
    };

    // マウント時
    window.addEventListener("beforeunload", handleWindowClose);

    //useEffectにreturn 関数はアンマウント時オートマ
    return () => {
      window.removeEventListener("beforeunload", handleWindowClose);
    };
  }, [formData]); // formData変更時にも実行追加

  return (
    <div className="p-4">
      <OneSignalInitial/>
      <MemoizedHeader/>

      <div className="mb-2 pr-3">
        <section className="font-sans">
          <div className="container p-3">
            <div className="peer flex justify-between">
              <h1 className="mb-2 text-3xl font-bold text-gray-800">
                断捨離あぷり
              </h1>
              <button className="md:w-34 h-9 w-1/3 rounded-md bg-purple-400/50 px-2 py-1 font-serif text-white hover:bg-purple-500 focus:outline-none ">
                まにゅある
              </button>
            </div>

            <section className="hidden border-4 border-double border-purple-600 peer-hover:block peer-hover:md:flex peer-hover:md:justify-around">
              <div className="border-b border-double border-purple-600 md:border-r">
                <div className="flex items-center justify-around ">
                  <p className="mx-1 mb-1 w-1/3 p-1 text-sm first-letter:float-left first-letter:mr-3 first-letter:text-7xl first-letter:font-bold first-line:uppercase first-line:tracking-widest md:text-lg">
                    断捨離品目名を入力し、適切なカテゴリを選択してSubmitボタンを押すと、アイテムに期限が割り当てられます。
                  </p>
                  <Image
                    src={manual1Image}
                    alt={`manual1`}
                    className="aspect-auto w-2/3 border-l border-double border-purple-600"
                  />
                </div>
              </div>
              <div className="">
                <div className="flex items-center justify-around ">
                  <p className="mx-1 mb-1 w-1/3 p-1 text-sm first-letter:float-left first-letter:mr-3 first-letter:text-7xl first-letter:font-bold first-line:uppercase first-line:tracking-widest md:text-lg">
                    Limit欄に設定された時間が過ぎるとActions欄の背景色が赤色に変わり、プルダウンメニューからは断捨離を行うか期限を延ばすかを選択できます。(背景色の変更が反映されない場合はページをリロード)
                  </p>
                  <Image
                    src={manual2Image}
                    alt={`manual2`}
                    className="aspect-auto w-2/3 border-l border-double border-purple-600"
                  />
                </div>
              </div>
            </section>

            <p className="mb-1 text-lg text-gray-700">
              捨てられない物を登録し、期限内に使用されなかったものを断捨離するよう通知します。
            </p>
            <p className="mb-1 text-lg text-gray-700">
              あなたは、断捨離をするか期限を延ばすかを選択できます。
            </p>
          </div>
        </section>

        <form
          className="flex flex-col px-6 py-4 md:flex-row"
          onSubmit={handleSubmitText(onSubmitText)}
        >
          <div className="mb-2 pr-3">
            <input
              {...registerText("item", {
                required: true,
                maxLength: 25,
                pattern:
                  /^[A-Za-z0-9_-\uFF21-\uFF3A\uFF41-\uFF5A\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]+$/, // Regular expression to allow alphanumeric characters, underscore, hyphen, full-width English characters, and Japanese characters
              })}
              type="text"
              placeholder=" 断捨離品目名"
            />
            {textErrors.item && textErrors.item.type === "required" && (
              <div className="text-red-500">Item is required</div>
            )}
            {textErrors.item && textErrors.item.type === "pattern" && (
              <div className="text-red-500">
                Only alphanumeric characters, underscore, hyphen, full-width
                English characters, and Japanese characters are allowed
              </div>
            )}
            {textErrors.item && textErrors.item.type === "maxLength" && (
              <div className="text-red-500">
                Maximum length exceeded (maximum: 25 characters)
              </div>
            )}
          </div>

          <div className="mb-2 pr-3">
            <input
              {...registerText("summary", {
                required: false,
                maxLength: 25,
                pattern:
                  /^[A-Za-z0-9_-\uFF21-\uFF3A\uFF41-\uFF5A\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]+$/, // Regular expression to allow alphanumeric characters, underscore, hyphen, full-width English characters, and Japanese characters
              })}
              type="text"
              placeholder=" 品目の説明文(省略可)"
            />
            {textErrors.summary && textErrors.summary.type === "pattern" && (
              <div className="text-red-500">
                Only alphanumeric characters, underscore, hyphen, full-width
                English characters, and Japanese characters are allowed
              </div>
            )}
            {textErrors.summary && textErrors.summary.type === "maxLength" && (
              <div className="text-red-500">
                Maximum length exceeded (maximum: 25 characters)
              </div>
            )}
          </div>

          <div className="mb-2 pr-3">
            <select
              className="rounded-md bg-white p-1"
              {...registerText("category", { required: true })}
            >
              <option value="">Category...</option>
              <option value="1day">1day</option>
              <option value="3day">3day</option>
              <option value="ファッション">ファッション</option>
              <option value="ホビー">ホビー</option>
              <option value="日用品">日用品</option>
              <option value="コスメ">コスメ</option>
              <option value="食品">食品</option>
              <option value="家具">家具</option>
              <option value="家電">家電</option>
              <option value="約束">約束</option>
              <option value="思い出">思い出</option>
              <option value="恋人">恋人</option>
              <option value="悩み事">悩み事</option>
            </select>
            {textErrors.category && (
              <div className="text-red-500">Please select a category</div>
            )}
          </div>
          <button
            type="submit"
            className="w-30 rounded-md bg-blue-500/50 px-4 py-1 text-white hover:bg-blue-600 focus:bg-blue-600 focus:outline-none max-md:w-56"
          >
            Submit
          </button>
        </form>

        <section className="my-2 mb-2 p-3">
          <h1 className="mb-2 font-serif text-2xl">Decluttering Item List</h1>
          <div className="my-1 overflow-x-auto sm:-mx-2 lg:-mx-4">
            <div className="inline-block min-w-full pb-1 sm:px-2 lg:px-4">
              <div className="overflow-hidden">
                <table className="min-w-full border-4 border-double border-teal-600 text-center">
                  <thead className="border-b bg-blue-200">
                    <tr className="font-serif">
                      <th className="border-2 px-1 py-1">Item</th>
                      <th className="border-2 px-1 py-1">Limit</th>
                      <th className="border-2 px-1 py-1">Actions</th>
                      <th className="border-2 px-1 py-1">Category</th>
                      <th className="border-2 px-1 py-1">Summary</th>
                    </tr>
                  </thead>
                  <tbody className="border-b bg-yellow-100/90 font-sans text-xs">
                    {formData.map((data) => (
                      <tr key={data.id}>
                        <td className="border-2 px-1 py-1">{data.item}</td>
                        <td
                          className={classNames(
                            "border-2 px-1 py-1",
                            //index === 1 ? "w-1/4": "w-1/2",
                            //new Date(data.date) <= new Date(currentDate.getTime()) ? "bg-pink-600 text-white": "bg-blue-600 text-white",
                            new Date(data.date) <=
                              new Date(new Date().getTime()) && "text-pink-600",
                          )}
                        >
                          {new Date(data.date).toLocaleString("ja-JP", {
                            dateStyle: "short",
                            timeStyle: "short",
                          })}
                        </td>
                        <td className="border-2 px-1 py-1">
                          <select
                            className={classNames(
                              "rounded-md  border-2 bg-white px-1 py-1",
                              new Date(data.date) <=
                                new Date(new Date().getTime()) &&
                                "!bg-pink-500 text-white hover:!bg-pink-600",
                            )}
                            value={selectedOption}
                            onChange={(e) => {
                              setSelectedOption(e.target.value);
                              handleAction(e.target.value, data.id);
                            }}
                          >
                            <option className="" value="">
                              Select...
                            </option>
                            <option value="delete">Delete</option>
                            <option value="extendH">1hourの延長</option>
                            <option value="extendD">1dayの延長</option>
                          </select>
                        </td>
                        <td className="border-2 px-1 py-1">{data.category}</td>
                        <td className="border-2 px-1 py-1">{data.summary}</td>
                        {/*<td>{currentDate.toLocaleStlring('ja-JP', { dateStyle: 'short', timeStyle: 'short' })}</td>*/}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <p className="font-serif mb-2 mr-2 text-lg text-green-800">
              reload消滅用
            </p>
            <button
              onClick={handleSave}
              className="w-1/3 rounded-md bg-green-600/50 px-4 py-1 mb-2 font-serif text-white  hover:bg-red-600 focus:bg-red-600 focus:outline-none"
            >
              Save
            </button>
          </div>
          <div className="flex justify-end">
            <button
              onClick={clearLocalStorage}
              className="w-1/3 rounded-md bg-pink-600/50 px-4 py-1 font-serif text-white  hover:bg-red-600 focus:bg-red-600 focus:outline-none"
            >
              All Clear
            </button>
          </div>
        </section>

        <section className="font-sans">
          <div className="container mx-auto p-3">
            <p className="mb-2 text-lg text-gray-700">
              登録アイテム数は最大25個までです。
            </p>
            <p className="mb-2 text-lg text-gray-700">
              同PCおよび同ブラウザでのみデータを保存できます。(共有PCの場合認証todo)
            </p>
            <p className="mb-2 text-lg text-gray-700">
              プライベートタブやトラッキング強化ブラウザではデータが保存できない場合があります。(対応:あぷりをインストール)
            </p>
            <p className="mb-2 text-lg text-gray-700">
              あぷりをインストールすることでオフライン使用＆アラームプッシュ通知(todo)を受け取ることができます。
            </p>
            <button className="md:w-34 h-9 w-5/6 rounded-md bg-purple-400/50 px-2 py-1 mb-2 font-serif text-white hover:bg-purple-500 focus:bg-purple-500 "
              onClick={() => setShowPwaSection(!showPwaSection)}
            >
              {showPwaSection ? 'まにゅあるを閉じる' : 'あぷりインストールまにゅある'}
            </button>
            {showPwaSection && (
              <section className="border-4 border-double border-purple-600 md:flex md:justify-around">
                <div className="border-b border-double border-purple-600 md:border-r">
                  <div className="flex items-center justify-around ">
                    <p className="mx-1 mb-1 w-1/3 p-1 text-sm first-letter:float-left first-letter:mr-3 first-letter:text-7xl first-letter:font-bold first-line:uppercase first-line:tracking-widest md:text-lg">
                      パソコンの場合、ウェブサイトの上部にあるURLの近くにある『インストール』ボタンを選択します。
                    </p>
                    <Image
                      src={pwa2Image}
                      alt={`pwa2`}
                      className="aspect-auto w-2/3 border-l border-double border-purple-600"
                    />
                  </div>
                </div>
                <div className="border-b border-double border-purple-600 md:border-r">
                  <div className="flex items-center justify-around ">
                    <p className="mx-1 mb-1 w-1/3 p-1 text-sm first-letter:float-left first-letter:mr-3 first-letter:text-7xl first-letter:font-bold first-line:uppercase first-line:tracking-widest md:text-lg">
                      モバイル端末の場合、画面右上のメニューから『アプリをインストール』を選択します。
                    </p>
                    <Image
                      src={pwa1Image}
                      alt={`pwa1`}
                      className="aspect-auto w-2/3 border-l border-double border-purple-600"
                    />
                  </div>
                </div>
                <div className="">
                  <div className="flex items-center justify-around ">
                    <p className="mx-1 mb-1 w-1/3 p-1 text-sm first-letter:float-left first-letter:mr-3 first-letter:text-7xl first-letter:font-bold first-line:uppercase first-line:tracking-widest md:text-lg">
                      ホーム画面にショートカットが作成されます。
                    </p>
                    <Image
                      src={pwa3Image}
                      alt={`pwa3`}
                      className="aspect-auto w-2/3 border-l border-double border-purple-600"
                    />
                  </div>
                </div>
              </section>
            )}
          </div>

        </section>

        <div className="pt-6">
          <MemoizedFooter />
        </div>
      </div>
    </div>
  );
}
